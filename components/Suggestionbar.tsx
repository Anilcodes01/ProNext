export default function Suggesstionbar() {
  return (
    <div>
      <div className="mt-20 flex flex-col  min-h-screen gap-6">
        <div className=" w-full  rounded-lg border text-gray-600 border-gray-100 p-2 ">
          Serverless functions represent a modern approach to building and
          deploying scalable applications without the need to manage server
          infrastructure. Unlike traditional server-based architectures, where
          developers must provision, configure, and maintain servers, serverless
          computing abstracts these tasks away. Developers write individual
          units of logic known as functions, which are executed in response to
          specific events. These events can be HTTP requests, file uploads,
          database triggers, or scheduled tasks. Cloud providers such as AWS,
          Azure, and Google Cloud handle the underlying infrastructure,
          automatically scaling resources up or down as needed.
        </div>
        <div className="h-[40%] w-full rounded-lg bg-yellow-400">
          Welcome to the world...!
        </div>
      </div>
    </div>
  );
}
