import React, {memo, useCallback, useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {RTL_DIRECTION, RTL_STYLE} from '../constants';
import Icon from '../../Icons';

function RenderBadge({
  rtl,
  label,
  value,
  textStyle,
  badgeStyle,
  badgeTextStyle,
  badgeDotStyle,
  getBadgeColor,
  getBadgeDotColor,
  showBadgeDot,
  onPress,
  THEME,
}) {
  /**
   * onPress.
   */
  const __onPress = useCallback(() => onPress(value), [onPress, value]);

  /**
   * The badge style.
   * @returns {object}
   */
  const _badgeStyle = useMemo(
    () => [
      RTL_DIRECTION(rtl, THEME.badgeStyle),
      ...[badgeStyle].flat(),
      {
        backgroundColor: getBadgeColor(value),
      },
    ],
    [value, THEME, rtl, badgeStyle, getBadgeColor],
  );

  /**
   * The badge dot style.
   * @return {object}
   */
  const _badgeDotStyle = useMemo(
    () => [
      RTL_STYLE(rtl, THEME.badgeDotStyle),
      ...[badgeDotStyle].flat(),
      {
        backgroundColor: getBadgeDotColor(value),
      },
    ],
    [value, THEME, rtl, badgeDotStyle, getBadgeDotColor],
  );

  /**
   * The badge text style.
   * @returns {object}
   */
  const _badgeTextStyle = useMemo(
    () => [...[textStyle].flat(), ...[badgeTextStyle].flat()],
    [textStyle, badgeTextStyle],
  );

  const iconColor = _badgeDotStyle.find(item => item.color).color;

  return (
    <TouchableOpacity style={_badgeStyle} onPress={__onPress}>
      {showBadgeDot && (
        <Icon
          style={{marginLeft: 5}}
          name={'Icon-36'}
          size={14}
          color={iconColor}
        />
      )}
      <Text style={_badgeTextStyle}>{label}</Text>
    </TouchableOpacity>
  );
}

const areEqual = (nextProps, prevProps) => {
  if (nextProps.label !== prevProps.label) return false;
  if (nextProps.value !== prevProps.value) return false;
  if (nextProps.showBadgeDot !== prevProps.showBadgeDot) return false;
  if (nextProps.rtl !== prevProps.rtl) return false;
  if (nextProps.theme !== prevProps.theme) return false;

  return true;
};

export default memo(RenderBadge, areEqual);
