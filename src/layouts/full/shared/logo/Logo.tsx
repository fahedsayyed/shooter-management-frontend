import { FC } from 'react';
import './styles.scss';
import { useSelector } from 'src/store/Store';
import { Link } from 'react-router-dom';
// import { ReactComponent as LogoDark } from 'src/assets/images/logos/dark-logo.svg';
import { ReactComponent as LogoDarkRTL } from 'src/assets/images/logos/dark-rtl-logo.svg';
// import { ReactComponent as LogoLight } from 'src/assets/images/logos/light-logo.svg';
import { ReactComponent as LogoLightRTL } from 'src/assets/images/logos/light-logo-rtl.svg';
import { ReactComponent as Shooter } from 'src/assets/images/logos/logo (2).svg';
import {  styled } from '@mui/material';
import { AppState } from 'src/store/Store';
// import shooterImg from '../../../../assets/images/logos/shooter-logo.png';

const Logo: FC = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? '53px' : '220px',
    overflow: 'hidden',
    display: 'block',
  }));

  if (customizer.activeDir === 'ltr') {
    return (
      <LinkStyled to="/">
        {customizer.activeMode === 'dark' ? (
          <Shooter height={customizer.TopbarHeight} />
        ) : (
          <Shooter height={customizer.TopbarHeight} />
        )}
      </LinkStyled>
    );
  }

  return (
    <LinkStyled to="/">
      {customizer.activeMode === 'dark' ? (
        <LogoDarkRTL height={customizer.TopbarHeight} />
      ) : (
        <LogoLightRTL height={customizer.TopbarHeight} />
      )}
     
    </LinkStyled>

  );
};

export default Logo;
