import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  HStack,
  Menu,
  MenuButton,
  Avatar,
  VStack,
  MenuList,
  MenuItem,
  MenuDivider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  useBreakpoint,
  Portal,
} from "@chakra-ui/react";
import { FiHome, FiMenu, FiChevronDown } from "react-icons/fi";
import { HiCog } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "./features/userSlice";
import { NavLink as ReachLink, Outlet, useLocation } from "react-router-dom";
import useLogin from "./hooks/useLogin";
import { useEffect, useState } from "react";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const breakpoint = useBreakpoint();

  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        sx={{ overflowY: "auto" }}
      />

      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
        isFullHeight
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      {(location.pathname == "/" || breakpoint != "base") && (
        <MobileNav onOpen={onOpen} />
      )}

      <Box ml={{ base: 0, md: 60 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

const SidebarContent = ({ onClose, ...rest }) => {
  const dispatch = useDispatch();

  const { navDrawer } = useLogin();

  const auth = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.token.token);
  const [linkItems, setLinkItems] = useState([]);

  useEffect(() => {
    navDrawer(token, auth.id)
      .then((res) => {
        let { data } = res.data;
        setLinkItems(data);
      })
      .catch((error) => {
        let responses = error.response;
        if (responses.status == 401) {
          dispatch(userLogout());
        }
      });
  }, []);

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="xl" fontFamily="monospace" fontWeight="bold">
          {import.meta.env.VITE_APP_TITLE}
        </Text>

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <Link
        as={ReachLink}
        to="/"
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
        _activeLink={{ fontWeight: "bold" }}
      >
        <Flex
          align="center"
          p="2"
          borderRadius="lg"
          role="group"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
        >
          <Icon
            ml="6"
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={FiHome}
          />
          Home
        </Flex>
      </Link>

      {linkItems.map((link) => (
        <NavItem
          key={link.id}
          icon={link.module_icon}
          sub={link.menus}
          onClose={onClose}
        >
          {link.module_name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, sub, onClose, ...rest }) => {
  return (
    <Accordion allowMultiple {...rest}>
      <AccordionItem>
        <h2>
          <AccordionButton
            borderRadius="lg"
            _hover={{
              bg: "cyan.400",
              color: "white",
            }}
          >
            <Box as="span" flex="1" textAlign="left">
              <Flex align="center" mx="4">
                {icon && (
                  <Icon
                    mr="4"
                    fontSize="16"
                    _groupHover={{
                      color: "white",
                    }}
                    as={HiCog}
                  />
                )}
                {children}
              </Flex>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>

        <AccordionPanel pb={4}>
          {sub.map((item) => (
            <Link
              as={ReachLink}
              to={item.menu_route}
              style={{ textDecoration: "none" }}
              _focus={{ boxShadow: "none" }}
              _activeLink={{ fontWeight: "bold" }}
              key={item.id}
              onClick={onClose}
            >
              <Flex
                align="center"
                p="2"
                mx="4"
                borderRadius="lg"
                role="group"
                _hover={{
                  bg: "cyan.400",
                  color: "white",
                }}
              >
                {item.menu_icon && (
                  <Icon
                    mr="4"
                    fontSize="16"
                    _groupHover={{
                      color: "white",
                    }}
                    as={HiCog}
                  />
                )}
                {item.menu_name}
              </Flex>
            </Link>
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const auth = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  // console.log(auth);

  return (
    <Flex
      as="header"
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="16"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      sx={{
        position: "sticky",
        top: "0",
        zIndex: "9",
      }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <Flex alignItems={"center"}>
        <Menu isLazy>
          <MenuButton
            py={2}
            transition="all 0.3s"
            borderRadius="md"
            _hover={{ bg: "gray.400" }}
            _expanded={{ bg: "blue.400" }}
            _focus={{ boxShadow: "none" }}
          >
            <HStack>
              <Avatar
                size={"sm"}
                src={`https://ui-avatars.com/api/?name=${auth.name}&background=random`}
              />

              <VStack
                display={{ base: "none", md: "flex" }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                <Text fontSize="sm">{auth.name}</Text>
                {/* <Text fontSize="xs" color="gray.600">
                  {auth.employment.branch_name}
                </Text> */}
              </VStack>

              <Box display={{ base: "none", md: "flex" }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>

          <Portal>
            <MenuList
              isFocusable
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <Link as={ReachLink} to="/profile">
                <MenuItem>Profile</MenuItem>
              </Link>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  let r = confirm("Apakah anda yakin akan logout?");
                  if (r) {
                    dispatch(userLogout());
                  }
                }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default App;
