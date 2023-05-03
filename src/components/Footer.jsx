import { AiFillGithub } from "react-icons/ai"

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 py-2 mt-auto grid place-content-center">
      <a
        href="https://github.com/GiorgiVartanov/movies-frontend"
        className="text-slate-100"
      >
        <AiFillGithub size={26} />
      </a>
    </footer>
  )
}
export default Footer
