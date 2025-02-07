export default function UserProfile({params}: any) {
    const {id} = params;
    return (
       <div className="flex flex-col text-white items-center justify-center min-h-screen py-2">
       <h1>Profile</h1>
       <hr/>
       <p className="text-4xl">ProfilePage</p> 
       <span className="p-2 ml-2 rounded bg-orange-500">{id}</span>
       </div>
    )
}
