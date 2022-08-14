import { TextInput, Button, Text } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IconAt, IconBuilding } from "@tabler/icons";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useStyles } from "./Profile.styles";

const Profile = () => {
  const { classes } = useStyles();

  return (
    <div>
      <Navbar></Navbar>

      <div className={classes.root}>
        <Text className={classes.text}>Edit Profile</Text>
        <div className={classes.form}>
          <form>
            <div className={classes.content}>
              <TextInput
                icon={<IconBuilding size={14}></IconBuilding>}
                label="Institute name"
                placeholder="Enter your institute name"
                className={classes.textInput}
                required
              ></TextInput>
              <TextInput
                icon={<IconAt size={14}></IconAt>}
                label="Institute domain"
                placeholder="Enter your institute's domain"
                className={classes.textInput}
                disabled={true}
              ></TextInput>
              <div className={classes.timeInputs}>
                <TimeInput
                  label="Begin classes"
                  clearable
                  required
                  className={classes.timeInput}
                ></TimeInput>
                <TimeInput
                  label="End classes"
                  clearable
                  required
                  className={classes.timeInput}
                ></TimeInput>
              </div>

              <Button type="submit" fullWidth>
                Save changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
