import React,{useState} from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import CustomButton from '../../../Helpers/CustomButton';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
function VideoCall() {
    const [roomId,setRoomId] = useState()
    const navigate = useNavigate()
    const handleJoin = ()=>{
        navigate(`/patient/room/${roomId}`)
    }
  return (
    <Paper
    sx={{
      p: 2,
      margin: 'auto',
      maxWidth: 500,
      flexGrow: 1,
      marginTop:{xs:"30px",md:'100px'},
      backgroundColor: (theme) =>
        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    }}
  >
    <Grid container spacing={2} >
      <Grid item>
        <ButtonBase sx={{ width: 128, height: 128 }}>
          <Img alt="complex" src="/static/images/grid/complex.jpg" />
        </ButtonBase>
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1" component="div">
              Standard license
            </Typography>
            <Typography variant="body2" gutterBottom>
              Full resolution 1920x1080 • JPEG
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID: 1030114
            </Typography>
          </Grid>
          <Grid item>
            <TextField 
            id="standard-basic" 
            label="Enter Room ID" 
            variant="standard"
            value={roomId}
            onChange={e => setRoomId(e.target.value)} />
          </Grid>
          <CustomButton onClick = {handleJoin}>Join</CustomButton>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" component="div">
            $19.00
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Paper>
  )
}

export default VideoCall
