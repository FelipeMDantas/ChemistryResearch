import { useEffect, useState, useRef } from "react";
import { useChannel } from "ably/react";
import { useAbly } from "ably/react";
import { useUser } from "../context/UserContext";
import {
  createGroup,
  getAllGroups,
  getGroupMessages,
} from "@/lib/actions/group.actions";
import { getUserByEmail } from "@/lib/actions/user.actions";
import { useSession } from "next-auth/react";

function ChatBox() {
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [receivedMessages, setMessages] = useState([]);
  const [user_, setUser_] = useState("");
  const { data: session } = useSession();
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [receivedMessages]);

  useEffect(() => {
    const fetchGroups = async () => {
      const groupsFromServer = await getAllGroups();
      const user_ = await getUserByEmail(session?.user?.email);
      setUser_(user_);
      setGroups(groupsFromServer);
    };
    fetchGroups();
  }, [session?.user?.email]);

  const handleCreateGroup = async (groupName) => {
    if (groupName && !groups.some((group) => group.name === groupName)) {
      const newGroup = await createGroup(groupName, user_._id);
      setGroups([...groups, newGroup]);
      setCurrentGroup(newGroup);
      setMessages([]);
    }
  };

  const handleJoinGroup = async (groupId) => {
    const selectedGroup = groups.find((group) => group._id === groupId);
    setCurrentGroup(selectedGroup);

    const groupMessages = await getGroupMessages(groupId);
    const formattedMessages = groupMessages.map((msg) => ({
      ...msg,
      connectionId: msg.sender._id,
      name: `${msg.sender.firstName} ${msg.sender.lastName}`,
      image: msg.sender.photo || "/default-avatar.png",
      data: msg.text,
      timestamp: msg.timestamp,
    }));

    setMessages(formattedMessages);
  };
}
