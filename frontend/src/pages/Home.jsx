import { useEffect, useState } from "react";

export const Home = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5500/api/posts");
        const data = await response.json();
        console.log(data);
        setPosts(data);
        setLoading(false);
        setError(null);
      } catch (err) {
        console.log(err);
        setError(err);
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="border-b border-gray-300 bg-gray-100">
        <div className="container mx-auto px-5">
          <p className="py-2 text-center text-sm">
            The source code for this blog is{" "}
            <a
              href="https://github.com/vsompura3/commentate-blog-application"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-success underline transition-colors duration-200"
            >
              {" "}
              available on GitHub.
            </a>{" "}
            PRs are welcome.
          </p>
        </div>
      </div>
      <header className="container mx-auto px-5">
        <div className="mb-16 mt-16 flex flex-col items-center md:mb-12 md:justify-between lg:flex-row">
          <h1 className="text-5xl font-bold leading-tight tracking-tighter sm:text-6xl md:text-8xl lg:pr-8">
            Commentate.
          </h1>
          <p className="mt-5 text-center text-xl md:text-left lg:pl-8">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
        </div>
      </header>

      <section className="container mx-auto px-5">
        <div className="grid gap-12 sm:grid-cols-2">
          {loading && <p className="text-center text-2xl">Loading...</p>}
          {posts &&
            posts.map((post) => (
              <div
                key={post._id}
                className="rounded-md border border-gray-700 p-4 text-black shadow-md"
              >
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="text-lg">{post.desc}</p>
                <p className="">
                  <span className="font-bold">Author:</span> {post.username}
                </p>
              </div>
            ))}
          {error && (
            <p className="text-center text-2xl text-red-600">{error.message}</p>
          )}
        </div>
      </section>
    </div>
  );
};
