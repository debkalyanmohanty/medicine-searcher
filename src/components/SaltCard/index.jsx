import React, { useState } from 'react';
import { Box, ButtonBase, Card, Typography, CardContent } from '@mui/material';

const SaltCard = ({ salt }) => {
    
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedStrengthI, setSelectedStrengthI] = useState(0);
    const [selectedPackI , setSelectedPackI] = useState(0);
    const [selectedForm , setSelectedForm] = useState(salt?.availableForms[0]?.form||'');
    const [selectedStrength , setSelectedStrength] = useState(salt?.availableForms[0]?.strengths[0]?.strength||'');
    const [selectedPack , setSelectedPack] = useState(salt?.availableForms[0]?.strengths[0]?.packings[0]?.packing ||'');
    const [showMoreForms, setShowMoreForms] = useState(false);
    const [showMoreStrengths , setShowMoreStrengths] = useState(false);
    const [showMorePackings , setShowMorePackings] = useState(false);
    const handleFormClick = (index) => {
        setSelectedIndex(index);
        setSelectedStrengthI(0); 
        setSelectedPackI(0);
        setSelectedForm(salt?.availableForms[index]?.form||'');
        setSelectedStrength(salt?.availableForms[index]?.strengths[0]?.strength||'');
        setSelectedPack(salt?.availableForms[index]?.strengths[0]?.packings[0]?.packing ||'');
        setCost(salt?.availableForms[index]?.strengths[selectedStrengthI]?.packings[selectedPackI].minCost);
    };

    const handleStrengthClick = (index) => {
        setSelectedStrengthI(index);
        setSelectedPackI(0);
        setSelectedStrength(salt?.availableForms[selectedIndex]?.strengths[index]?.strength||'');
        setSelectedPack(salt?.availableForms[selectedIndex]?.strengths[index]?.packings[0]?.packing ||'');
        setCost(salt?.availableForms[selectedIndex]?.strengths[index]?.packings[selectedPackI].minCost);
    };

    const findMinimumCost = (products) => {
        if (!products || products.length === 0) return 0;
        let minPrice = products[0]?.pharmacies?.[0]?.selling_price || 0;
        products.forEach(product => {
            if (product && product.pharmacies) {
                product.pharmacies.forEach(pharmacy => {
                    if (pharmacy && pharmacy.selling_price < minPrice) {
                        minPrice = pharmacy.selling_price;
                    }
                });
            }
        });
        return minPrice;
    };
    
    
    const [cost , setCost] = useState(findMinimumCost(salt?.availableForms[0]?.strengths[0]?.packings[0]?.products) || 0);

    return (
        <Card sx={{
            marginTop: '40px',
            background: 'linear-gradient(90deg, rgba(255,255,255,1) 16%, rgba(197,255,231,1) 100%)',
            display: 'flex',
            width: '100%',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            borderRadius: '20px',
            flexDirection: { xs: 'column', sm: 'column', md: 'row' }
        }}>
            <CardContent sx={{ flex: '1 0 auto', width: { sm: '100%', md: '32%' } }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '20px',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        <Typography>Form:</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', flexWrap: 'wrap', width: '60%' }}>
                            {salt.availableForms.slice(0, showMoreForms ? salt.availableForms.length : 4).map((av, i) => (
                                <ButtonBase
                                    key={i}
                                    onClick={() => {
                                        setSelectedForm(av.form);
                                        handleFormClick(i);
                                    }}
                                    sx={{
                                        width: '45%',
                                        height: '30px',
                                        padding: '10px',
                                        borderRadius: '10px',
                                        fontSize: '10px',
                                        border: selectedIndex === i ? '2px solid #1E5128' : '2px solid grey',
                                        boxShadow: selectedIndex === i && '0.5px 0.5px 8px -2px rgba(30,81,40,1)'
                                    }}
                                >
                                    {av.form}
                                </ButtonBase>
                            ))}
                            {salt.availableForms.length > 4 && (
                                <ButtonBase
                                    onClick={() => setShowMoreForms(!showMoreForms)}
                                    sx={{
                                        width: '100%',
                                        color: '#2C4E80',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                    }}
                                >
                                    {showMoreForms ? 'Less' : 'More'}
                                </ButtonBase>
                            )}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        <Typography>Strength:</Typography>
                        <Box
        sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            flexWrap: 'wrap',
            width: '60%'
        }}
    >
        {salt.availableForms[selectedIndex]?.strengths.slice(0, showMoreStrengths ? salt.availableForms[selectedIndex]?.strengths.length : 4).map((strength, index) => (
            <ButtonBase
                key={index}
                onClick={() => {
                    setSelectedStrength(strength.strength);
                    handleStrengthClick(index);
                }}
                sx={{
                    width: '45%',
                    height: '30px',
                    padding: '5px',
                    borderRadius: '10px',
                    fontSize: '10px',
                    border: selectedStrengthI === index ? '2px solid #1E5128' : '2px solid grey',
                    boxShadow: selectedStrengthI === index && '0.5px 0.5px 8px -2px rgba(30,81,40,1)'
                }}
            >
                {strength.strength}
            </ButtonBase>
        ))}

        {salt.availableForms[selectedIndex]?.strengths.length > 4 && (
            <ButtonBase
                onClick={() => setShowMoreStrengths(!showMoreStrengths)}
                sx={{
                    width: '100%',
                                        color: '#2C4E80',
                                        fontSize: '12px',
                                        fontWeight: '600',
                }}
            >
                {showMoreStrengths ? 'Less' : 'More'}
            </ButtonBase>
        )}
    </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography>Packaging:</Typography>
                        <Box
        sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            flexWrap: 'wrap',
            width: '60%'
        }}
    >
        {salt.availableForms[selectedIndex]?.strengths[selectedStrengthI]?.packings.slice(0, showMorePackings ? salt.availableForms[selectedIndex]?.strengths[selectedStrengthI]?.packings.length : 4).map((packing, index) => (
            <ButtonBase
                key={index}
                onClick={(e) => {
                    setSelectedPack(packing.packing);
                    setSelectedPackI(index);
                    setCost(packing.minCost);
                }}
                sx={{
                    width: '45%',
                    height: '30px',
                    padding: '5px',
                    borderRadius: '10px',
                    fontSize: '10px',
                    border: packing.available ? (selectedPackI === index ? '2px solid rgba(30,81,40,1)' : '2px solid grey') : (selectedPackI === index ? '2px dashed rgba(30,81,40,1)' : '2px dashed grey'),
                    boxShadow: selectedPackI === index && '0.5px 0.5px 8px -2px rgba(30,81,40,1)'
                }}
            >
                {packing.packing}
            </ButtonBase>
        ))}
        {salt.availableForms[selectedIndex]?.strengths[selectedStrengthI]?.packings.length > 4 && (
            <ButtonBase
                onClick={() => setShowMorePackings(!showMorePackings)}
                sx={{
                    width: '100%',
                                        color: '#2C4E80',
                                        fontSize: '12px',
                                        fontWeight: '600',
                }}
            >
                {showMorePackings ? 'Less' : 'More'}
            </ButtonBase>
        )}
    </Box>
                    </Box>
                </Box>
            </CardContent>
            <Box sx={{ margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pl: 1, pb: 1, height: '100%', width: { sm: '100%', md: '33%' }  , flexWrap: 'wrap' , wordWrap: 'break-word'}}>
                <Typography variant="h6" sx={{wordWrap: 'break-word' , textAlign:'center'}}>{salt.salt}</Typography>
                <Typography variant="caption" sx={{ color: '#2C4E80' , wordWrap: 'break-word'  , textAlign:'center'}}>{selectedForm || 'Not Available'} | {selectedStrength || 'Not Available'} | { selectedPack || 'Not Available'}</Typography>
            </Box>
            {cost === 0 || cost === null || cost === Infinity ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent:'center',
                        alignItems:'center', width: { sm: '100%', md: '33%' }
                    }}
                >

                <Box
                    sx={{
                        background: '#fff',
                        width: '50%' , 
                        height: '60px' , 
                        border: '2px solid rgba(197,255,231,1)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        margin: '20px auto 20px auto'
                    }}
                >
                <Typography variant='caption' textAlign={'center'}>No stores selling this product near you</Typography>

                </Box>
                </Box>

            ): (
                <Box sx={{ margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pl: 1, pb: 1, height: '100%', width: { sm: '100%', md: '33%' } }}>
                <Typography variant='h4' sx={{ fontWeight: 800 }}>From &#8377;{cost}</Typography>
            </Box>
            )}
            
        </Card>
    );
}

export default SaltCard;
