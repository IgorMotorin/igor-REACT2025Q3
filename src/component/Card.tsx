export default function Card({
  name = '',
  text = '',
}: Readonly<{
  name: string;
  text: string;
}>) {
  return (
    <li className="relative m-1 w-60 rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg">
      <div className="bg-white p-5 rounded-md">
        <h1 className="font-bold text-xl mb-2">{name}</h1>
        <p>{text}</p>
      </div>
    </li>
  );
}
