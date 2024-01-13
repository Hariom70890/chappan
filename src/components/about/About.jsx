import { Container, Grid, Typography } from '@mui/material';
import './About.css';

export const About = () => {
   return (
      <div className="abt">
         <Container>
            <Typography variant="h3" style={{ marginBottom: '20px' }}>
               Who are we ?
            </Typography>
            <Grid container spacing={3}>
               <Grid item xs={12} md={6}>
                  <Typography align="left" paragraph>
                     Chappan Dukan, it tops the priority list of all foodies and is a perfect family hangout. As the name suggests, this market has fifty-six shops, making it truly Disney's land for food lovers. It showcases a wide variety of cuisines ranging from snacks to chats, milkshakes, ice cream, juices, sweet meats, all in one place. Other attractions here include pony rides, balloon shooting, camel rides, small swings. Its easy on-pocket menu and lively ambiance make people visit it again and again.
                  </Typography>
               </Grid>
               <Grid item xs={12} md={6}>
                  <img
                     src="https://b.zmtcdn.com/web/about/a7b0a36d5107f3590895981dab2eeac31563208212.jpeg?output-format=webp"
                     alt=""
                     style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
               </Grid>
            </Grid>
         </Container>
      </div>
   );
};
