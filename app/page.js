'use client';

import { Box, Button, Stack, TextField, Typography, InputAdornment, AppBar, Toolbar, IconButton } from '@mui/material';
import { useState } from 'react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function Home() {
  const [name, setName] = useState('');
  const [feeling, setFeeling] = useState('');
  const [rant, setRant] = useState('');
  const [compliment, setCompliment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const sendComplimentRequest = async () => {
    if (!name.trim() || !feeling.trim() || !rant.trim() || isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, feeling, rant }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok, status code: ${response.status}`);
      }

      const data = await response.json();
      setCompliment(data.compliment);
    } catch (error) {
      console.error('Error:', error);
      setCompliment("I'm sorry, but I encountered an error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Animation message disappears after 2 seconds
    });
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        background: 'linear-gradient(135deg, #6A0572 30%, #1E90FF 100%)',
        color: '#fff',
        justifyContent: 'center',
      }}
    >
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: 'rgba(255, 255, 255, 112)', boxShadow: 'none', color: '#6A0572' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            CheerUpBot 🌟
          </Typography>
          <Box sx={{ position: 'relative' }}>
            <IconButton color="inherit" onClick={copyToClipboard}>
              <ContentCopyIcon />
              <Typography sx={{ ml: 1 }}>Share if Liked</Typography>
            </IconButton>
            {isCopied && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '100%', // Position it right below the "Share if Liked" button
                  left: '20%',
                  transform: 'translateX(-20%)',
                  backgroundColor: '#6A0572',
                  color: '#fff',
                  padding: '4px 30px',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  animation: 'fade-in-out 2s ease',
                  mt: 1.5, // Adds a small gap between the button and notification
                  mr: 4,

                }}
              >
                Link copied to clipboard!
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Combined Input and Output Section */}
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 2, flexGrow: 1 }} // Reduced mb to bring sections closer to the button
      >
        {/* Input Section */}
        <Box
          width="35%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={4}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Lighter background for visibility
            borderRadius: '12px',
            boxShadow: 3,
            mr: 2,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: '#6A0572',
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 3,
            }}
          >
            CheerUp 🌟
          </Typography>
          <Stack
            direction={'column'}
            width="80%"
            spacing={3}
          >
            <TextField
              label="What's your name?"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              sx={{
                backgroundColor: '#f1f1f1',
                borderRadius: '8px',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="How are you feeling?"
              fullWidth
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
              variant="outlined"
              sx={{
                backgroundColor: '#f1f1f1',
                borderRadius: '8px',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SentimentSatisfiedAltIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Want to share something?"
              fullWidth
              multiline
              rows={4}
              value={rant}
              onChange={(e) => setRant(e.target.value)}
              variant="outlined"
              sx={{
                backgroundColor: '#f1f1f1',
                borderRadius: '8px',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ChatBubbleOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              onClick={sendComplimentRequest}
              disabled={isLoading}
              fullWidth
              sx={{
                backgroundColor: '#8A2BE2',
                color: '#fff',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#1E90FF',
                },
              }}
            >
              {isLoading ? 'Sending...' : 'Compliment me'}
            </Button>
          </Stack>
        </Box>

        {/* Output Section */}
        <Box
          width="50%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={5}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // Lighter background for better readability
            borderRadius: '12px',
            boxShadow: 6,
            ml: 5,
          }}
        >
          {compliment ? (
            <Typography
              variant="h6"
              sx={{
                color: '#6A0572',
                fontStyle: 'italic',
                padding: '20px',
                borderRadius: '8px',
                maxWidth: '80%',
                overflowY: 'auto',
                maxHeight: '400px',
              }}
            >
              {compliment}
            </Typography>
          ) : (
            <Typography
              variant="h6"
              sx={{
                color: '#6A0572',
                fontStyle: 'italic',
                maxWidth: '80%',
              }}
            >
              Your personalized compliment will appear here.
            </Typography>
          )}
        </Box>
      </Box>

      {/* Button Below Sections */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={-2} // Negative margin to bring the button closer to the sections
        mb={5}
      >
        <Button
          variant="outlined"
          onClick={refreshPage}
          sx={{
            borderRadius: '8px',
            color: '#fff',
            borderColor: '#fff',
            '&:hover': {
              backgroundColor: '#1E90FF',
              color: '#fff',
              borderColor: '#1E90FF',
            },
          }}
        >
          Another Compliment
        </Button>
      </Box>
    </Box>
  );
}
