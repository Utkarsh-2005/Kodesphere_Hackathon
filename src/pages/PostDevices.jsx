import React from 'react';
import { useState } from 'react';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import QuantityInput from '../components/NumberInput';
import TempInput from '../components/TempInput';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { HexColorPicker } from "react-colorful";
import { Toaster, toast } from 'sonner'



const PostDevices = ({id}) => {
    const [color, setColor] = useState("#aabbcc");
    const [speed, setSpeed] = useState(0);
    const [temp, setTemp] = useState(16);
    const [device, setDevice] = useState('');
    const [bulb, setBulb] = useState(0)
    const [cbulb, csetBulb] = useState(false)
    const [ac, setAc] = useState(0)
    const [cac, setcAc] = useState(false)

    const FormSubmitHandler = (e) => {
      e.preventDefault();
      if (device===""){
        return toast.error("Please select a device");
        }
      let data ={}
      if (device==="fan"){
      data ={
        teamid:id,
        device: device,
        value: speed
      }} else if(device==="bulb"){
        data ={
          teamid:id,
          device: device,
          value: bulb
        }
      }else if(device ==="ac"){
        data = {
          teamid:id,
          device: device,
          value: {"temp":temp, "state":ac}
        }
      }else if(device === "led"){
        data ={
          teamid:id,
          device: device,
          value: color
        }
      }
      console.log(data)
      axios
      .post(`https://kodessphere-api.vercel.app/devices`, data)
      .then(()=> {
        
        // enqueueSnackbar('Order Placed', {variant: 'success'})
        // console.log(data)
        toast.success('Successfully sent to API')
      })
      .catch((error) => {
  
        toast.error(error.message)
      })
    }
  
    const handleTempChange = (event) => {
      setTemp(event);
    };
  
    // const handleInputChange = (event) => {
    //   setInputValue(event.target.value); // Update input value
    // };
    // const idSubmitHandler = (e) => {
    //   setId(inputValue)
    //   e.preventDefault();
    //   toast.success('Success')
    // }
    const handleQuantityChange = (event) => {
      setSpeed(event);
    };
    const handleDevice = (event) => {
      setDevice(event.target.value);
    };
  
    const bulbChangeHandler = (event, value) => {
      if (value===true){
        setBulb(1);
      }else{
        setBulb(0)
      }
      csetBulb(value)
    }
    
    const acChangeHandler = (event, value) => {
      if (value===true){
        setAc(1);
      }else{
        setAc(0)
      }
      setcAc(value)
    }
return(
<div className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-br from-black to-gray-800">
<form onSubmit={FormSubmitHandler} className="mx-auto p-5 flex flex-col justify-between items-center border-purple-400 bg-gradient-to-b from-blue-300 to-purple-400 rounded-xl sm:h-[500px] transition-all duration-500 sm:min-w-[500px] shadow-teal-300 shadow-lg hover:shadow-xl h-fit">
  <h1 className="text-center text-lg mx-2 text-white font-medium">Configure Your Devices</h1>
    <div className="flex flex-col sm:flex-row pb-10 items-center sm:item sm:items-start
     sm:justify-between h-max transition-all duration-500 sm:mt-5 mt-1 w-max sm:h-[490px]">
    <Box sx={{ minWidth: 120 }} className="m-10">
  <FormControl fullWidth>
    <InputLabel id="container">Device</InputLabel>
    <Select
      labelId="container"
      id="container"
      value={device}
      label="Container"
      onChange={handleDevice}
    >
      <MenuItem value={'fan'}>Fan</MenuItem>
      <MenuItem value={'bulb'}>Bulb</MenuItem>
      <MenuItem value={'led'}>Led</MenuItem>
      <MenuItem value={'ac'}>A.C.</MenuItem>
    </Select>
  </FormControl>
</Box>
<div className={`h-[300px] sm:w-[200px] w-fit ${device===""? "flex items-center":""}`}>
    {device==="fan"? <div>
      <label className='flex justify-center items-center'>Speed</label>
    <QuantityInput onChange={handleQuantityChange} currval={speed}/>
    <img src="/fan.png" className={`${speed!==0? "animate-spin":""} w-[200px] p-4`}/>
    </div>:device==="bulb"?<div className='flex flex-col items-center justify-center'>
    <Switch onChange={bulbChangeHandler} checked={cbulb}/><div className="h-[150px]">
    {bulb===1? <img src="/bulb_on.png" className='w-[150px] p-5'/>:<img src="/bulb_off.png" className='w-[150px] p-5'/>}</div>
    </div>:device==="ac"?<>
    <div className='flex flex-col items-center'>
    <label className='text-sm m-1'>Toggle</label>
    <Switch onChange={acChangeHandler} checked={cac}/>
    <label className='text-sm m-1'>Temperature</label>
    <TempInput onChange={handleTempChange} currval={temp}/>
    {ac===1? <img src="/ac_on.png" className='w-[200px] p-5'/>:<img src="/ac_off.png" className='w-[200px] p-5'/>}
    </div>
    </>:device==="led"? <div className='flex justify-center sm:w-[200px] w-[140px] items-center m-5'><HexColorPicker color={color} onChange={setColor} /></div>:<p className='text-white'>Please Select a Device</p>}
  </div>
  </div>

  
  <div className='flex flex-col justify-center'>
  <button type="submit" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800
  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
  </div>
</form>

</div>
)
}

export default PostDevices;
