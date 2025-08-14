'use client';
export default function NotFound() {
  return (
    <div
      className={'absolute p-10 w-full h-full bg-white opacity-90 z-10 visible'}
    >
      <div className="flex items-center justify-center">
        <span className="text-2xl mr-4">404. Not found</span>
      </div>
      <button
        onClick={() => {
          window.history.back();
        }}
        className="max-w-42 min-w-24 py-2 px-2 font-medium rounded-lg transition-colors focus:outline-none bg-blue-600 hover:bg-blue-700 text-white active:bg-blue-600"
      >
        Назад
      </button>
    </div>
  );
}
