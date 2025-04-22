import { Navbar, Nav, Container } from 'react-bootstrap';

const FooterMenu = () => (
    <div className={"bg-secondary py-2 card-footer fixed-bottom "}>
            <ul className={"list-group d-flex flex-row align-items-center justify-content-center gap-4"}>
                <li className={"text-white fw-semibold list-inline"}>Home</li>
                <li className={"text-white fw-semibold list-inline"}>Vagas</li>
                <li className={"text-white fw-semibold list-inline"}>Contato</li>
            </ul>
    </div>
);

export default FooterMenu;
