// import React from 'react'
import {Box , Divider, Typography} from '@mui/material';
import SearchBar from '../../components/SearchBar';
import SaltCard from '../../components/SaltCard';


const Home = ({salts , setSalts}) => {

    
  return (
    <Box>
        <Box
            sx={{
                width: '80%',
                display:'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                margin: 'auto',
                gap: '40px',
                marginBottom: '40px'
            }}
        >
        <SearchBar salts={salts} setSalts={setSalts}/>
        <Divider/>
        </Box>
        {
            salts && salts.length > 0 ? (
                salts.map((salt) => (
                    <Box
                        key={salt.id}  
                        sx={{
                            width: '80%',
                            display:'flex',
                            flexDirection: 'column',
                            justifyContent:'center',
                            margin: 'auto',
                            gap: '40px'
                        }}
                    >
                        <SaltCard salt={salt}/>
                    </Box>
                ))
                
            ): (
                <Box sx={{width: '100%' , height: '80vh' , display:'flex' , justifyContent:'center' , alignItems:'center'}}>
                    <Typography variant='h5' sx={{
                        color: 'grey' , fontWeight: '600' , textAlign:'center'
                    }}>
                    &quot; Find medicines with amazing discount &quot;
                    </Typography>
                </Box>
            )
        }
         
    </Box>
  )
}

export default Home