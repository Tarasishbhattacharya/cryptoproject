import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCoin } from '../../Redux/Cryptoslice';
import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
const Home = () => {
    const dispatch=useDispatch();
    const {coinData,isLoading}= useSelector((state)=>state.coin)
    const [open, setOpen] = useState(false);
    const[singlecoin,setSingleCoin]=useState({})
    const[num,setNum]=useState(10)
  const handleOpen = (data) =>{
     const singleData=coinData.find((coin)=>{
        return coin.id.toLowerCase()===data.id.toLowerCase()
     })
     setSingleCoin(singleData)
     setOpen(true)
  }
  const slice=coinData.slice(0,num)
  const handleClose = () => setOpen(false);
    // let[data,setData]=useState(coinData)
    console.log(coinData)
    useEffect(()=>{
      dispatch(getCoin())
    },[])

    const loadMore=()=>{
        if(num<=coinData.length){
            setNum(num+num)
        }
        
        
    }

    if(isLoading){
        return <h2>Loading..</h2>
    }
    const refresh=()=>{
        dispatch(getCoin())
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

  return (
    <>
    <Button onClick={refresh}>Refresh</Button>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">name</TableCell>
            <TableCell align="right">price</TableCell>
            <TableCell align="right">symbol</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {slice?.map((coin) => (
            <TableRow onClick={()=>handleOpen(coin)}
              key={coin.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {coin.id}
              </TableCell>
              <TableCell align="right">{coin.name}</TableCell>
              <TableCell align="right">{coin.priceUsd}</TableCell>
              <TableCell align="right">{coin.symbol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button onClick={loadMore}>{num!=coinData.length-1?"load more":null}</Button>
    {/* <Button onClick={viewMore}>view More</Button> */}
    {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography>Edit the form</Typography>
          <TextField label="name" type="text" value={singlecoin?.name} /><br />
          <TextField label="price" type='number' value={singlecoin?.priceUsd} /><br />
          <TextField label="symbol" type='text' value={singlecoin?.symbol}/><br />
        </Box>
      </Modal>
    </>
  )
}

export default Home
