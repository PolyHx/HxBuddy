import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { Context as AuthContext } from '../context/AuthContext';

const drawerWidth = 240;

const appName = 'HxBuddy';

interface NavbarProps {
  window?: () => Window;
  navItems: Array<NavItem>;
  logout?: boolean;
}

interface NavItem {
  route: string;
  text: string;
}

export default function Navbar(props: NavbarProps) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { signOut } = useContext<any>(AuthContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {appName}
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {props.navItems.map((item) => (
              <Link
                to={item.route}
                key={item.route}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Button key={item.route} sx={{ color: '#fff' }}>
                  {item.text}
                </Button>
              </Link>
            ))}
            {props.logout && (
              <Link
                to="/"
                key="/"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Button
                  sx={{ color: '#fff' }}
                  onClick={() => {
                    localStorage.removeItem('token');
                    signOut();
                  }}
                >
                  Logout
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              {appName}
            </Typography>
            <Divider />
            <List>
              {props.navItems.map((item) => (
                <Link
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  to={item.route}
                  key={item.route}
                >
                  <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
              {props.logout && (
                <Link
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  to="/"
                  key="/"
                  onClick={() => {
                    localStorage.removeItem('token');
                    signOut();
                  }}
                >
                  <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                  </ListItem>
                </Link>
              )}
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  );
}
