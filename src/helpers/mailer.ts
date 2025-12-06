import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create a hased token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpire: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        resetToken: hashedToken,
        resetTokenExpire: Date.now() + 3600000,
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

const path = emailType === "VERIFY" ? "verifyemail" : "resetpassword";
const actionUrl = `${process.env.DOMAIN}/${path}?token=${hashedToken}`;
const subject =
  emailType === "VERIFY" ? "Verify your email" : "Reset your password";
const actionText = emailType === "VERIFY" ? "Verify Email" : "Reset Password";
const intro =
  emailType === "VERIFY"
    ? "Welcome! Please verify your email to activate your account."
    : "You requested to reset your password. Click the button below to continue.";
const expiry = "This link will expire in 1 hour.";

const mailOptions = {
  from: "selfdevquest@gmail.com",
  to: email,
  subject,
  text: `${intro}\n\n${actionUrl}\n\nIf you did not request this, you can ignore this email.\n\n— SelfDevQuest`,
  html: `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
    </head>
    <body style="margin:0;padding:0;background:#f4f6fb;font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <!-- Preheader (hidden) -->
      <div style="display:none;max-height:0px;overflow:hidden;">
        ${emailType === "VERIFY" ? "Verify your email to activate your account." : "Reset your password. Link valid for 1 hour."}
      </div>

      <table role="presentation" width="100%" style="max-width:680px;margin:28px auto;background:#ffffff;border-radius:12px;box-shadow:0 8px 24px rgba(20,20,50,0.06);overflow:hidden;">
        <tr>
          <td style="padding:24px;text-align:center;border-bottom:1px solid #eef2ff;">
            <h1 style="margin:0;font-size:20px;color:#0f172a;">${subject}</h1>
          </td>
        </tr>

        <tr>
          <td style="padding:28px 32px 20px;color:#0f172a;">
            <p style="margin:0 0 16px;line-height:1.55;font-size:15px;color:#334155;">
              ${intro}
            </p>

            <div style="text-align:center;margin:20px 0;">
              <a href="${actionUrl}" target="_blank" rel="noopener" style="background:#2563eb;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:10px;display:inline-block;font-weight:600;box-shadow:0 6px 18px rgba(37,99,235,0.18);">
                ${actionText}
              </a>
            </div>

            <p style="margin:0 0 8px;font-size:13px;color:#64748b;">
              ${expiry}
            </p>

            <p style="margin:12px 0 0;font-size:13px;color:#475569;word-break:break-all;">
              If the button doesn't work, copy & paste this link into your browser:
              <br />
              <a href="${actionUrl}" style="color:#2563eb;text-decoration:underline;">${actionUrl}</a>
            </p>

            <hr style="border:none;border-top:1px solid #eef2ff;margin:20px 0;" />

            <p style="margin:0;font-size:13px;color:#64748b;">
              If you didn't request this, you can safely ignore this email.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:16px 24px;background:#fbfdff;text-align:center;color:#94a3b8;font-size:12px;">
            © ${new Date().getFullYear()} SelfDevQuest. All rights reserved.
          </td>
        </tr>
      </table>
    </body>
  </html>
  `,
};

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
