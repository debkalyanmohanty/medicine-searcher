import * as React from 'react';
import { Box, Button, IconButton, InputAdornment , InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BackIcon from '@mui/icons-material/KeyboardBackspace';
import { BASE_URL } from '../../api/client';
import axios from 'axios';
const SearchBar = ({salts , setSalts}) => {
    const [searchText , setSearchText] = React.useState('');
    const [searching , setSearching] = React.useState('');
    const handleSubmit = () => {
        setSearching(true);
        axios
            .get(BASE_URL + `q=${searchText.toLowerCase()}&pharmacyIds=1,2,3`)
            .then((res) => {
                console.log(res.data.data.saltSuggestions);
                const saltsData = res.data.data.saltSuggestions;
                const filteredSalts = saltsData.map((salt) => {
                    const availableForms = salt.available_forms.map((form) => ({
                        form: form,
                        strengths: [],
                        available: true
                    }));
                    
                    Object.entries(salt.salt_forms_json).forEach(([form, strengthsObj]) => {
                        const formDetails = availableForms.find((f) => f.form === form);
                        if (formDetails) {
                            Object.keys(strengthsObj).forEach((strength) => {
                                const packingsObj = strengthsObj[strength];
                                const available = Object.keys(packingsObj).some((packing) =>
                                    Object.keys(packingsObj[packing]).some((productId) => packingsObj[packing][productId] !== null)
                                );
                                const strengthData = {
                                    strength: strength,
                                    available: available,
                                    packings: Object.keys(packingsObj).map((packing) => {
                                        const products = Object.keys(packingsObj[packing]).map((productId) => ({
                                            productId: productId,
                                            pharmacies: packingsObj[packing][productId]
                                        }));
                                        const minCost = available ? products.reduce((min, product) => {
                                            const productMinPrice = product.pharmacies ? Object.values(product.pharmacies).reduce((minPrice, pharmacy) => {
                                                if (pharmacy && 'selling_price' in pharmacy) {
                                                    return Math.min(minPrice, pharmacy.selling_price);
                                                }
                                                return minPrice;
                                            }, Infinity) : Infinity;
                                            return Math.min(min, productMinPrice);
                                        }, Infinity) : null;
                                        return {
                                            packing: packing,
                                            available: products.some(product => product.pharmacies !== null),
                                            products: products,
                                            minCost: minCost
                                        };
                                    })
                                };
                                formDetails.strengths.push(strengthData);
                            });
                        }
                    });
                    
                    return {
                        id: salt.id,
                        salt: salt.salt,
                        availableForms: availableForms
                    };
                });
                console.log(filteredSalts);
                setSalts(filteredSalts);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    
  return (
    <Box
        sx={{
            marginTop: { xs: '50px', sm: '70px' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
           
        }}
    >

        <InputBase
            sx={{
                    width: '100%',
                    height: '60px',
                    borderRadius: '50px',
                    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    fontSize: '16px',
                    padding: '10px 20px 10px 20px',
                    '& .MuiInputBase-input::placeholder': {
                        outline: 'none',
                        border: '0',
                        fontSize:'16px',
                        fontWeight: '600'
                    },
                    '&::focus': {
                        border: 0,
                        outline: 'none',
                        borderColor: 'transparent', 
                    },
                }}
                        placeholder='Type your medicine name here'
                        startAdornment =  {
                                <InputAdornment position="start">
                                       { searching ?
                                        (
                                            <IconButton
                                                onClick={(e) => {
                                                    setSearchText('');
                                                    setSearching(false);
                                                    setSalts([]);
                                                    }}                                                
                                            >
                                                <BackIcon  sx={{
                                            color: '#000',
                                            }}/>
                                            </IconButton>
                                        )
                                       
                                        : <SearchIcon 
                                        sx={{
                                            color: '#000',
                                            }}
                                        
                                        />}
                                </InputAdornment>
                        }
                        endAdornment = {
                             <InputAdornment position="end">
                                    <Button 
                                        variant='text'
                                        sx={{
                                            color: '#2C4E80',
                                            textTransform: 'none',
                                            fontWeight: '600',
                                            fontSize: '15px'
                                        }}
                                        onClick={handleSubmit}
                                    >
                                        Search
                                    </Button>
                                </InputAdornment>
                        }
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                     />
    </Box>
  )
}

export default SearchBar;
