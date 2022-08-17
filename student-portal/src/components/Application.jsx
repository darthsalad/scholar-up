import React,{useRef} from 'react'
import styled from "styled-components";
import UploadFileIcon from '@mui/icons-material/UploadFile';

const Application = () => {
    const upload = useRef()
  return (
    <Container>

        <Wrapper onClick={()=>upload.current.click()}>
            <input type="file" ref={upload} style={{display:"none"}}/>
            <UploadFileIcon  style={{ color: "#658ec6",fontSize:"3rem"}}/>
            <p  style={{ color: "#658ec6",fontSize:"1.5rem"}}>Browse File to Upload</p>
        </Wrapper>
        <ApplicationList>
           <h3 style={{ color: "#658ec6"}}> Application</h3>
           <Files>
            <File>
                <Name>application.pdf</Name>
                <UploadDate>{new Date().toLocaleDateString()}</UploadDate>
            </File>
            <File>
                <Name>application.pdf</Name>
                <UploadDate>{new Date().toLocaleDateString()}</UploadDate>
            </File>
            <File>
                <Name>application.pdf</Name>
                <UploadDate>{new Date().toLocaleDateString()}</UploadDate>
            </File>
           </Files>
            </ApplicationList>
    </Container>
  )
}

export default Application


const Container = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center; 

`

const Wrapper = styled.form`
width: 80%;
border: 1px solid #658ec6;
border-radius:10px;
border-style: dashed;
height:30%;
display: flex;
flex-direction:column;
justify-content: center;
align-items: center;
cursor: pointer;
&:hover{
    background-color: #658ec673;
}

`

const ApplicationList = styled.div`
    width: 80%;
`

const Files = styled.div``

const File =  styled.div`
margin: 5px 0;
display: flex;
justify-content: space-between;
padding:10px;
background-color: #658ec673;
border-radius: 10px;
position: relative;
`

const Name = styled.div`
font-size: 20px;
`

const UploadDate = styled.div`
position: absolute;right: 3px;
bottom: 0;
font-size: 13px;
color:"#658ec6"
`