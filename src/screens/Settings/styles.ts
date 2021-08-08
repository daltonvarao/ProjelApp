import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.ScrollView``;

export const NameContainer = styled.View`
  background: ${colors.primary};
  display: flex;
  align-items: center;
  padding: 32px 0;
  height: 300px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

export const NameAbbrCircle = styled.Text`
  width: 120px;
  height: 120px;
  background: #fff;
  text-align: center;
  text-align-vertical: center;
  color: ${colors.primary};
  font-size: 54px;
  font-family: 'Poppins-Bold';
  border-radius: 66px;
  margin-bottom: 22px;
`;

export const NameText = styled.Text`
  color: #fff;
  font-size: 28px;
  font-family: 'Poppins-SemiBold';
`;

export const InfoContainer = styled.View`
  padding: 0 20px;
  margin-top: -50px;
`;

export const InfoCard = styled.View`
  background: #fff;
  padding: 20px 20px;
  border-radius: 10px;
  justify-content: space-between;
  height: 100px;

  elevation: 2;

  margin-bottom: 8px;
`;

export const InfoLabel = styled.Text`
  font-family: 'Poppins-Regular';
  text-transform: uppercase;
  font-size: 14px;
  color: ${colors.primary};
  margin-bottom: 8px;
`;

export const InfoTitle = styled.Text`
  font-family: 'Poppins-Bold';
  font-size: 22px;
  color: ${colors.primary};
`;

export const LogoutTitle = styled.Text`
  font-family: 'Poppins-SemiBold';
  font-size: 18px;
  color: white;
`;

export const SyncTitle = styled.Text`
  font-family: 'Poppins-SemiBold';
  font-size: 18px;
  color: ${colors.dark};
`;

export const Title = styled.Text`
  font-size: 16px;
  font-family: 'Poppins-SemiBold';
  padding: 12px 0;
  color: #333;
  margin-bottom: 14px;
  border-bottom-width: 1px;
  border-bottom-color: #bbb4;
  text-transform: uppercase;
`;
