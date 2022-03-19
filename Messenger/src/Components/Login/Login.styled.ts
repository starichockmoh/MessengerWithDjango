import styled from "styled-components";
import {Input} from "antd";


export const InputField = styled(Input)`
  border-radius: 8px;
  background: rgba(239,239,239,1);
`

export const InputPassword = styled(Input.Password)`
  border-radius: 8px;
  background: rgba(239,239,239,1);
`

export const LoginBlock = styled.div`
  position: absolute;
  margin-top: 15vh;
  min-height: 85vh;
  min-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`


export const LoginStyled = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  background-color: #2C5273;
  .LogImg{
    margin-left: 6vw;
    width: 40vw;
    height: auto;
  }
  @media (max-width: 900px) {
    .LogImg{
      display: none;
    }
  }
`
export const LoginFormStyled = styled.div`
  padding-top: 5vh;
  padding-bottom: 5vh;
  margin-top: 4vh;
  width: 38vw;
  background-color: #DCDCDC;
  border-radius: 30px;
  box-shadow: 0 0 24px 16px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  .LogImgTwoBlock{
    width: 40%;
    height: auto;
    .LogImgTwo{
      width: 100%;
      height: auto;
    }
  }
  .login-form {
    margin-left: 0;
    margin-top: 3%;
    margin-bottom: 3%;
    width: 22vw;
    height: 100%;
    padding-right: 3vw;
    .input_name{
      font-size: 75%;
      color: #B1B5C3;
    }
  }
  .login-form-button {
    margin-top: 10px;
    width: 100%;
    color: #DCDCDC;
    font-size: 100%;
    border-radius: 15px;
    background-color: #2C5273;
  }
  .exit-button {
    width: 100%;
    color: #2C5273;
    font-size: 100%;
    border-radius: 15px;
    background-color: white;
  }
  @media (max-width: 900px) {
    width: 70vw;
    .login-form {
      margin-right: 0;
      width: 100%;
      padding: 0 20px 0 20px;
    }
  }
  
  @media (max-width: 550px) {
    width: 90%;
    .LogImgTwoBlock{
      display: none;
    }
  }
`

export const RegFormStyled = styled.div`
  margin-top: 4vh;
  width: 38vw;
  background-color: #DCDCDC;
  border-radius: 30px;
  box-shadow: 0 0 24px 16px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  .LogImgTwoBlock{
    width: 40%;
    height: auto;
    .LogImgTwo{
      width: 100%;
      height: auto;
    }
  }
  .login-form {
    margin-left: 0;
    margin-top: 3%;
    margin-bottom: 3%;
    width: 22vw;
    height: 100%;
    padding-right: 3vw;
    .input_name{
      font-size: 75%;
      color: #B1B5C3;
    }
  }
  .login-form-button {
    margin-top: 10px;
    width: 100%;
    color: #DCDCDC;
    font-size: 100%;
    border-radius: 15px;
    background-color: #2C5273;
  }
  .exit-button {
    width: 100%;
    color: #2C5273;
    font-size: 100%;
    border-radius: 15px;
    background-color: white;
  }
  @media (max-width: 900px) {
    width: 70vw;
    .login-form {
      margin-right: 0;
      width: 100%;
      padding: 0 20px 0 20px;
    }
  }
  @media (max-width: 550px) {
    width: 90%;
    .LogImgTwoBlock{
      display: none;
    }
  }
`

