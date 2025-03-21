import { BrowserRouter, Link } from 'react-router-dom'
import s from './footer.module.scss'

export default function Footer() {
    return (
        <BrowserRouter>
            <footer className={s.containerFooter}>
                <section className={s.contatos}>
                    <section className={s.telefoneContato}>
                        <p>4002-8922</p>
                    </section>

                    <nav className={s.navbar_redesSociais}>
                        <ul className={s.navbar_lista}>
                            <li>
                                <Link to='http://www.facebook.com' target='_blank'>
                                    <i className="fa-brands fa-facebook"></i>
                                </Link>
                            </li>

                            <li>
                                <Link to='http://www.x.com' target='_blank'>
                                    <i className="fa-brands fa-twitter"></i>
                                </Link>
                            </li>

                            <li>
                                <Link to='http://www.youtube.com' target='_blank'>
                                    <i className="fa-brands fa-youtube"></i>
                                </Link>
                            </li>

                            <li>
                                <Link to='http://www.linkedin.com' target='_blank'>
                                    <i className="fa-brands fa-linkedin"></i>
                                </Link>
                            </li>

                            <li>
                                <Link to='http://www.instagram.com' target='_blank'>
                                    <i className="fa-brands fa-instagram"></i>
                                </Link>
                            </li>
                        </ul>

                    </nav>
                </section>

                <section className={s.direitosReservados}>
                    <p>Layout desenvolvido pela Vai Na Web para fins educativos - 2024</p>
                </section>
            </footer>
        </BrowserRouter>
    )
}