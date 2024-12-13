import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

async function Page() {
  const session = await auth();

  if (session) {
    return (
      <div>
        <h1>
          Welcome, {session.user?.name} - {session.user?.role}
        </h1>
        <p>Email: {session.user?.email}</p>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button>Sign out</Button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <p>Not signed in</p>
    </div>
  );
}

export default Page;
