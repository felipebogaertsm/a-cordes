import RegistrationForm from "./_components/RegistrationForm";

export default function Register() {
  return (
    <main>
      <h1>Create an account</h1>
      <h3 className="mt-2 font-normal">
        Register to <span className="font-semibold">à cordes</span>
      </h3>

      <div className="mt-12 max-w-[30rem] mx-auto">
        <RegistrationForm />
      </div>
    </main>
  );
}
