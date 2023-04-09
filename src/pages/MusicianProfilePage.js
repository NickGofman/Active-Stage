import React from 'react';

function MusicianProfilePage() {
  return (
    <div className="flex flex-col break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-full  px-4 flex justify-center">
            <div>
              <img
                alt="..."
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                style={{ maxWidth: '150px' }}
              />
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
            <div className="py-6 px-3 mt-32 sm:mt-0"></div>
          </div>
       
        </div>
        <div className="text-center mt-12">
          <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 ">
            Jenna Stones
          </h3>
          <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
            <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{' '}
            Los Angeles, California
          </div>
          <div className="mb-2 text-gray-700 mt-10">
            <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
            Solution Manager - Creative Tim Officer
          </div>
          <div className="mb-2 text-gray-700">
            <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
            University of Computer Science
          </div>
        </div>
        <div className="mt-10 py-10 border-t border-gray-300 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-9/12 px-4">
              <p className="mb-4 text-lg leading-relaxed text-gray-800">
                An artist of considerable range, Jenna the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy writes, performs
                and records all of his own music, giving it a warm, intimate
                feel with a solid groove structure. An artist of considerable
                range.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicianProfilePage;
