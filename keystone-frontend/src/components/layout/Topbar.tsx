import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useThemeMode } from '../../context/ThemeContext';

export const Topbar = ({ children }: { children?: React.ReactNode }) => {
  const { user, logout } = useAuth(); const { mode, toggleTheme } = useThemeMode(); const navigate=useNavigate(); const [anchorEl,setAnchorEl]=useState<null|HTMLElement>(null);
  const fullName=user?`${user.firstName} ${user.lastName}`:''; const initials=user?`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase():'';
  const close=()=>setAnchorEl(null); const signOut=()=>{close();logout();navigate('/login')};
  return <AppBar position="sticky" color="transparent" elevation={0}><Toolbar sx={{justifyContent:'space-between',gap:2,py:1.2}}><Box>{children}</Box><Stack direction="row" alignItems="center" spacing={1}><IconButton onClick={toggleTheme} sx={{bgcolor:'background.paper',boxShadow:1}}>{mode==='light'?<FiMoon/>:<FiSun/>}</IconButton><IconButton onClick={e=>setAnchorEl(e.currentTarget)} sx={{bgcolor:'background.paper',boxShadow:1}}><Avatar sx={{width:34,height:34,fontSize:14}}>{initials}</Avatar></IconButton><Box sx={{display:{xs:'none',sm:'block'}}}><Typography variant="body2" fontWeight={700}>{fullName}</Typography><Typography variant="caption" color="text.secondary">{user?.role}</Typography></Box><Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={close}><MenuItem onClick={()=>{close();navigate('/profile')}}>Profile</MenuItem><MenuItem onClick={signOut}>Sign out</MenuItem></Menu></Stack></Toolbar></AppBar>;
};
