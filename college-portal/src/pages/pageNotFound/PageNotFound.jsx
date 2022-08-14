import React from 'react'
import { useStyles } from './PageNotFound.styles';

const PageNotFound = () => {
    const { classes } = useStyles();
  return (
    <div>
          
          <div className={`container ${classes.mainContainer} `}>
            <div className={classes.innerContainer}>
                  <h1 className={classes.heading}><span>4</span><i class="far fa-question-circle fa-spin"></i><span>4</span></h1>
                  <h3 className={classes.subHeading}>Ooops! Page not found.</h3>
                  <h3 className={classes.text}>We're sorry, the page you were looking for isn't found here. The link you followed may either be broken or no longer exists.</h3>
            </div>
              
        </div>
         
    </div>
  )
}

export default PageNotFound