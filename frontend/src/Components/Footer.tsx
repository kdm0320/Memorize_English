import styled from "styled-components";

const FooterTag = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-top: 1.5px solid gray;
  justify-self: center;
  width: 100vw;
  height: 40px;
  bottom: 0;
  padding-top: 6px;
  color: lightgray;
`;
const Label = styled.span``;
const Email = styled.span``;
const Contact = styled.div`
  display: flex;
  padding-top: 0.5%;
  color: lightgray;
  justify-content: center;
  span {
    padding-top: 7px;
  }
  ${Label} {
    margin-right: 1%;
    font-size: 18px;
  }
  ${Email} {
    font-size: 18px;
  }
`;

function Footer() {
  return (
    <FooterTag>
      Copyright 2022. 김동민
      <Contact>
        <Label>Contact</Label>
        <Email>kdm3578@gmail.com</Email>
      </Contact>
    </FooterTag>
  );
}

export default Footer;
