export default function Card({
  name,
  age,
  email,
  password,
  passwordConfirm,
  gender,
  country,
  file = '',
  terms,
  lost,
}: Readonly<{
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirm: string;
  gender: string;
  terms: string;
  file: string;
  country: string;
  lost: boolean;
}>) {
  return (
    <fieldset
      className={`flex m-1  rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300  p-1 shadow-lg hover:opacity-80 ${lost ? 'from-pink-700 to-blue-700' : ''}`}
    >
      <div className="bg-white p-5 rounded-md dark:bg-cyan-950 dark:text-white">
        <h1 className="font-bold text-xl mb-2">Name: {name}</h1>

        <p>Age: {age}</p>
        <p>E-mail: {email}</p>
        <p>Password: {password}</p>
        <p>Confirm Password: {passwordConfirm}</p>
        <p>Gender: {gender}</p>
        <p>Country: {country}</p>
        <img src={file} width={'100px'} alt={''}></img>
        <p>Terms: {terms}</p>
      </div>
    </fieldset>
  );
}
