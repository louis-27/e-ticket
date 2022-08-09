export function Modal({ isOpen, toggleModal, action, message }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 z-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-md w-1/3 transition-all space-y-4">
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="text-xl text-gray-500 mt-1 mb-3">{message}</div>
            </div>

            <div className="flex justify-center space-x-3">
              <button
                className="bg-white hover:bg-gray-100 border px-4 py-2 text-gray-500 font-semibold rounded-lg"
                onClick={toggleModal}
              >
                No, cancel
              </button>
              <button
                className="bg-red-500 px-4 py-2 text-white font-semibold hover:bg-red-800 rounded-lg"
                onClick={() => {
                  action();
                  toggleModal();
                }}
              >
                Yes, I&apos;m sure
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
