export default function LoadingSpinner ()  {


  return (
    <div className='w-screen  flex items-center justify-center flex-col h-24 mt-24 relative '>
        <div className="relative inline-flex animate-spinner bg-blue-500">
          <div className="absolute w-12 h-12 bg-orange-500 transform  rotate-45 origin-center animate-spinner top-0 left-0"></div>
          <div className="absolute w-12 h-12 bg-gray-500 transform   rotate-135 origin-center animate-spinner top-0 right-0"></div>
          <div className="absolute w-12 h-12 bg-gray-500 transform   rotate-225 origin-center animate-spinner bottom-0 left-0"></div>
          <div className="absolute w-12 h-12 bg-orange-500 transform   rotate-315 origin-center animate-spinner bottom-0 right-0"></div>
        </div>
        <div className="mt-24 text-3xl  z-40">Loading...</div>
    </div>
  );
};
