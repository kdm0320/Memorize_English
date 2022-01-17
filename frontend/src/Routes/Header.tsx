function Header() {
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/login" ||
    window.location.pathname === "/signup"
  )
    return null;
  return <div>Fucking Header</div>;
}

export default Header;
