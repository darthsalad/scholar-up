import React, { useEffect, useState } from "react";
import { UnstyledButton, Group, Avatar, Text } from "@mantine/core";
import { IconPhoneCall, IconAt, IconChevronRight } from "@tabler/icons";
import { useStyle } from "./verified.styles";

const StudentList = (props) => {
  const opened = false;
  const { classes } = useStyle({ opened });
  const [mark, setMark] = useState(true);

  useEffect(() => {
    const today = new Date();
    const start = new Date(props.verifiedOn.seconds * 1000);
    let totalDays = (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    if (totalDays === 0) totalDays = 1;
    const attPercent = (props.totalAtt / totalDays) * 100;
    if (attPercent < 75) setMark(false);
  }, [props]);

  return (
    <div style={{ padding: "20px" }}>
      <UnstyledButton
        className={classes.user}
        onClick={() => {
          window.location = `/student/${props.id}`;
        }}
      >
        {/* {console.log(mark)} */}
        <Group noWrap>
          <Avatar src={props.image} size={94} radius="md" />
          <div>
            <Text
              size="xs"
              sx={{ textTransform: "uppercase" }}
              weight={700}
              color="dimmed"
            >
              College Domain: {props.cdomain}
            </Text>

            <Text
              size="lg"
              weight={500}
              className={classes.name}
              color={mark ? "green" : "red"}
            >
              {props.sname}
            </Text>

            <Group noWrap spacing={10} mt={3}>
              <IconAt stroke={1.5} size={16} className={classes.icon} />
              <Text size="xs" color="dimmed">
                {props.email}
              </Text>
            </Group>

            <Group noWrap spacing={10} mt={5}>
              <IconPhoneCall stroke={1.5} size={16} className={classes.icon} />
              <Text size="xs" color="dimmed">
                {props.mobile}
              </Text>
            </Group>
          </div>

          {<IconChevronRight size={14} stroke={1.5} />}
        </Group>
      </UnstyledButton>
    </div>
  );
};

export default StudentList;
