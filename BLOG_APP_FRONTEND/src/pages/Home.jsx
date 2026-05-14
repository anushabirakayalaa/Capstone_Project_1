import { Link } from "react-router-dom";

function Home({ currentUser }) {
  const profilePath = currentUser?.role === "AUTHOR" ? "/author-profile" : "/user-profile";
  const highlights = [
    ["Fresh reads", "Browse the latest articles from active authors."],
    ["Author desk", "Draft, update, and manage your own published work."],
    ["Clear archive", "Open any article for the full story and publishing timeline."],
    ["Quick feedback", "Every sign-in and article action confirms what happened."],
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto grid min-h-[calc(100vh-145px)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-sky-700">
            MERN Blog Application
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Write, manage, and read articles from one clean dashboard.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Readers can explore every active post, while authors get a focused space to
            publish, update, and retire their own writing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {currentUser ? (
              <Link
                to={profilePath}
                className="rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Open Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map(([title, body]) => (
            <div key={title} className="rounded-lg bg-slate-50 p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-lg font-bold text-slate-950">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
