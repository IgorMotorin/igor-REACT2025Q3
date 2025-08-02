export default function ErrorScreen({
  text = '',
  run = false,
}: Readonly<{
  text: string;
  run: boolean;
}>) {
  return (
    <div
      className={
        run
          ? 'absolute p-10 w-full h-full bg-white opacity-90 z-10 visible'
          : 'absolute p-10 w-full h-full bg-white opacity-90 z-10 invisible'
      }
    >
      <div className="flex items-center justify-center">
        <span className="text-2xl mr-4">{text}</span>
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
