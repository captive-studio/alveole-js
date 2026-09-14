import { Box, Button, Header, LucideIcon, Typography } from '@alveole/components';
import { useTheme } from '@alveole/theme';
import React from 'react';
import { Pressable } from 'react-native';

export type UIKitTopBarItem = {
  key: string;
  label: string;
  onPress: () => void;
};

export type UIKitTopBarProps = {
  activeKey: string;
  items: UIKitTopBarItem[];
};

const AlveoleLogo = () => {
  const { color, radius, text } = useTheme();
  return (
    <Box
      style={{
        width: 32,
        height: 32,
        borderRadius: radius('md'),
        backgroundColor: color.light.background['action-high-primary'],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography style={{ ...text['Corps de texte'].XS.Bold, color: '#fff' }}>A</Typography>
    </Box>
  );
};

export const UIKitTopBar = ({ activeKey, items }: UIKitTopBarProps) => {
  const { color, isVariant, spacing } = useTheme();
  const [menuOpen, setMenuOpen] = React.useState(false);

  if (isVariant('mobile')) {
    return (
      <>
        <Header
          logo={<AlveoleLogo />}
          right={
            <Pressable accessibilityRole="button" onPress={() => setMenuOpen(v => !v)} style={{ padding: 8 }}>
              <LucideIcon name={menuOpen ? 'X' : 'Menu'} size="md" color={color.light.text['title-grey']} />
            </Pressable>
          }
        />
        {menuOpen && (
          <Box
            style={{
              position: 'sticky',
              top: 64,
              left: 0,
              right: 0,
              zIndex: 99,
              backgroundColor: color.light.background['default-grey'],
              borderBottomWidth: 1,
              borderBottomColor: color.light.border['default-grey'],
              paddingTop: spacing('2W'),
              paddingBottom: spacing('2W'),
              paddingLeft: spacing('2W'),
              paddingRight: spacing('2W'),
              display: 'flex',
              flexDirection: 'column',
              gap: spacing('050'),
            }}
          >
            {items.map(item => (
              <Button
                key={item.key}
                variant={activeKey === item.key ? 'primary' : 'tertiary'}
                title={item.label}
                size="sm"
                onPress={() => {
                  item.onPress();
                  setMenuOpen(false);
                }}
              />
            ))}
          </Box>
        )}
      </>
    );
  }

  const right = (
    <Box display="flex" flexDirection="row" flexWrap="wrap" gap={8}>
      {items.map(item => (
        <Button
          key={item.key}
          variant={activeKey === item.key ? 'primary' : 'tertiary'}
          title={item.label}
          size="sm"
          onPress={item.onPress}
        />
      ))}
    </Box>
  );

  return <Header logo={<AlveoleLogo />} title="Alveole UI Kit" right={right} />;
};
