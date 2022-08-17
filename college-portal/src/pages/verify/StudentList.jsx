import React from 'react'
import {
    UnstyledButton,
    Group,
    Avatar,
    Text,
} from '@mantine/core'
import { 
    IconPhoneCall, 
    IconAt, 
    IconChevronRight 
} from "@tabler/icons"
import { useStyle } from './verified.styles'

const StudentList = (props) => {
  const opened = false;
  const { classes } = useStyle({opened});

  return (
    <div style={{ padding: "20px" }}>
    <UnstyledButton
        className={classes.user}
        onClick={() => {
            window.location = `/student/${props.id}`;
        }}
    >
        <Group noWrap>
        <Avatar
            src={props.image}
            size={94}
            radius="md"
        />
        <div>
            <Text
            size="xs"
            sx={{ textTransform: "uppercase" }}
            weight={700}
            color="dimmed"
            >
            College Domain: {props.cdomain}
            </Text>

            <Text size="lg" weight={500} className={classes.name}>
            {props.sname}
            </Text>

            <Group noWrap spacing={10} mt={3}>
            <IconAt
                stroke={1.5}
                size={16}
                className={classes.icon}
            />
            <Text size="xs" color="dimmed">
                {props.email}
            </Text>
            </Group>

            <Group noWrap spacing={10} mt={5}>
            <IconPhoneCall
                stroke={1.5}
                size={16}
                className={classes.icon}
            />
            <Text size="xs" color="dimmed">
                {props.mobile}
            </Text>
            </Group>
        </div>

        {<IconChevronRight size={14} stroke={1.5} />}
        </Group>
    </UnstyledButton>
    </div>
  )
}

export default StudentList