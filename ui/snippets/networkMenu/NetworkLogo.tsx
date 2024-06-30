import { Box, Image, useColorModeValue, Skeleton, chakra } from '@chakra-ui/react';
import React from 'react';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import IconSvg from 'ui/shared/IconSvg';

interface Props {
  isCollapsed?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  className?: string;
}

const LogoFallback = ({ isCollapsed, isSmall }: { isCollapsed?: boolean; isSmall?: boolean }) => {
  const field = isSmall ? 'icon' : 'logo';
  const logoColor = useColorModeValue('blue.600', 'white');

  const display = isSmall ? {
    base: 'none',
    lg: isCollapsed === false ? 'none' : 'block',
    xl: isCollapsed ? 'block' : 'none',
  } : {
    base: 'block',
    lg: isCollapsed === false ? 'block' : 'none',
    xl: isCollapsed ? 'none' : 'block',
  };

  if (config.UI.sidebar[field].default) {
    return <Skeleton w="100%" borderRadius="sm" display={ display }/>;
  }

  return (
    <IconSvg
      name="networks/logo-placeholder"
      width="auto"
      height="100%"
      color={ logoColor }
      display={ display }
    />
  );
};

const NetworkLogo = ({ isCollapsed, onClick, className }: Props) => {

  const logoSrc =  useColorModeValue("/static/logoLight.png", "/static/whitelogo.png");
  const iconSrc = useColorModeValue(config.UI.sidebar.icon.default, config.UI.sidebar.icon.dark || config.UI.sidebar.icon.default);
  // const darkModeFilter = { filter: 'brightness(0) invert(1)' };
  // const logoStyle = useColorModeValue({}, !config.UI.sidebar.logo.dark ? darkModeFilter : {});
  // const iconStyle = useColorModeValue({}, !config.UI.sidebar.icon.dark ? darkModeFilter : {});

  return (
    <Box
      className={ className }
      as="a"
      href={ route({ pathname: '/' }) }
      width={{ base: 'auto', lg: isCollapsed === false ? '165px' : '30px', xl: isCollapsed ? '30px' : '165px' }}
      height={{ base: '55px', lg: isCollapsed === false ? 'auto' : '30px', xl: isCollapsed ? '30px' : 'auto' }}
      display="inline-flex"
      overflow="hidden"
      onClick={ onClick }
      flexShrink={ 0 }
      aria-label="Link to main page"
    >
      { /* big logo */ }
      <Image
        w="auto"
        h="100%"
        src={ logoSrc }
        alt={ `${ config.chain.name } network logo` }
        fallback={ <LogoFallback isCollapsed={ isCollapsed }/> }
        display={{ base: 'block', lg: isCollapsed === false ? 'block' : 'none', xl: isCollapsed ? 'none' : 'block' }}
      />
      { /* small logo */ }
      <Image
        w="auto"
        h="100%"
        src='/static/favicon.png'
        alt={ `${ config.chain.name } network logo` }
        fallback={ <LogoFallback isCollapsed={ isCollapsed } isSmall/> }
        display={{ base: 'none', lg: isCollapsed === false ? 'none' : 'block', xl: isCollapsed ? 'block' : 'none' }}
      />
    </Box>
  );
};

export default React.memo(chakra(NetworkLogo));
