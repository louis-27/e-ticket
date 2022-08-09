export function Modal({ isOpen, toggleModal, action, message }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white p-6 border rounded-md w-1/3 transition flex flex-col items-end">
            <button 
              className="p-2 rounded-full hover:bg-gray-200 active:bg-gray-300"
              onClick={toggleModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <div className="w-full mb-6">
              <h1 className="text-lg font-bold">Confirmation</h1>
              <p className=" text-gray-500">{message}</p>
            </div>

            <div className="w-full flex justify-center gap-6">
              <button
                className="bg-white hover:bg-gray-100 active:bg-gray-200 border px-4 py-2 font-semibold rounded"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 px-4 py-2 text-white font-semibold hover:bg-red-700 active:bg-red-800 rounded"
                onClick={() => {
                  action();
                  toggleModal();
                }}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
