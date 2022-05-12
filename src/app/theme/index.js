import {DefaultTheme} from '@react-navigation/native';

export const LIGHT_THEME = {
  ...DefaultTheme,
  name: 'light',
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF',
    backgroundBtm: 'rgba(255, 255, 255, 0.95)',
    headerBackground: '#F8FAFC',
    inputBg: '#FFFFFF',
    inputText: '#0F172A',
    inputShadow: 'rgba(15, 23, 42, 1)',
    inputPlaceholder: '#94A3B8',
    inputFocuseBr: '#1D4ED8',
    inputErrorBr: '#DC2626',
    inputErrors: '#DC2626',
    addButton: {
      text: '#2563EB',
    },

    dropdown: {
      label: '#1E293B',
      selectBg: '#FFFFFF',
      selectBorder: '#F5F5F5',
      selectBorderBottom: '#E5E5E5',
      placeholderText: '#94A3B8',
      textSelected: '#0F172A',
      textFilled: '#0F172A',
      textStyle: '#475569',
      badgeText: '#0F172A',
      badgeBg: '#F1F5F9',
      badgeIcon: '#94A3B8',
      errors: '#DC2626',
      inputErrorBr: '#DC2626',
    },

    button: {
      primaryText: '#FFFFFF',
      primaryTextDisabled: '#FFFFFF',
      primaryBg: '#1D4ED8',
      primaryBgDisabled: '#DBEAFE',
      secondaryText: '#0F172A',
      secondaryTextDisabled: '#CBD5E1',
      secondaryBg: '#FFFFFF',
      secondaryBgDisabled: '#FFFFFF',
      secondaryBorder: '#C9D6E0',
      secondaryBorderDisabled: '#C9D6E0',
      deleteText: '#DC2626',
      deleteTextDisabled: '#FECACA',
      deleteBg: 'rgba(0, 0, 0, 0)',
      deleteBgDisabled: 'rgba(0, 0, 0, 0)',
      deleteFilledText: '#FFFFFF',
      deleteFilledTextDisabled: '#FFFFFF',
      deleteFilledBg: '#DC2626',
      deleteFilledBgDisabled: '#FECACA',
    },

    text: {
      primary: '#0F172A',
      secondary: '#0F172A',
    },

    checkbox: {
      true: '#1D4ED8',
      false: '#0F172A',
      bg: '#FFF',
      br: '#CBD5E1',
      abel: '#fff',
    },

    splitLine: {
      textMiddle: '#334155',
      text: '#334155',
      textBg: '#FFFFFF',
      border: '#CBD5E1',
    },

    typography: {
      primary: '#0F172A',
      secondary: '#1E293B',
      contrast: '#FFFFFF',
      accent: '#2563EB',
      gray: '#475569',
      additional: '#1D4ED8',
      nonactive: '#64748B',
      delete: '#F87171',
      error: '#DC2626',
      blue: '#075985',
      focus: '#60A5FA',
    },

    photoPicker: {
      bg: '#fff',
      br: '#94A3B8',
    },

    modal: {
      bg: 'rgba(255, 255, 255, 1)',
      br: '#94A3B8',
    },
    chatToolbar: {
      icons: '#94A3B8',
      sendIcon: '#2563EB',
      borderTop: '#E2E8F0',
      input: '#F8FAFC',
      background: '#FFFFFF',
      text: '#0F172A',
    },
    icon: {
      create: '#0F172A',
      search: '#CBD5E1',
      filter: '#2563EB',
    },
    accordion: {
      defaultBg: '#F8FAFC',
      activeBg: '#FFFFFF',
      chapterBg: '#F1F5F9',
      border: '#F8FAFC',
    },
    systemMessage: {
      bg: '#E2E8F0',
    },
    splitline: {
      bg: '#E2E8F0',
    },
    cardCompany: {
      header: '#FFFFFF',
      footer: '#1D4ED8',
    },
    deal: {
      background: '#F1F5F9',
      backgroundDocument: '#F8FAFC',
      backgroundPinnedDocument: '#F1F5F9',
      backgroundPinned: 'F8FAFC',
    },
  },
};

export const DARK_THEME = {
  ...DefaultTheme,
  name: 'dark',
  colors: {
    ...DefaultTheme.colors,
    background: '#111827',
    backgroundBtm: 'rgba(75, 85, 99, 0.95)',
    headerBackground: '#1F2937',
    inputBg: '#1F2937',
    inputText: '#fff',
    inputShadow: '#000',
    inputPlaceholder: '#6B7280',
    inputFocuseBr: '#9CA3AF',
    inputErrorBr: '#EF4444',
    inputErrors: '#FCA5A5',

    addButton: {
      text: '#60A5FA',
    },

    dropdown: {
      label: '#D1D5DB',
      selectBg: '#1F2937',
      selectBorder: '#1F2937',
      placeholderText: '#6B7280',
      textSelected: '#FFFFFF',
      textFilled: '#FFFFFF',
      textStyle: '#E5E7EB',
      badgeText: '#FFF',
      badgeBg: '#374151',
      badgeIcon: '#9CA3AF',
      errors: '#FCA5A5',
      inputErrorBr: '#EF4444',
      // badgeColors: [
      //   '#A7F3D0',
      //   '#BAE6FD',
      //   '#FEF3C7',
      //   '#F3F4F6',
      //   '#E5E7EB',
      //   '#EDE9FE',
      //   '#E0E7FF',
      //   '#FCE7F3',
      // ],
    },
    button: {
      primaryText: '#FFFFFF',
      primaryTextDisabled: '#4B5563',
      primaryBg: '#1D4ED8',
      primaryBgDisabled: '#1F2937',
      secondaryText: '#FFFFFF',
      secondaryTextDisabled: '#4B5563',
      secondaryBg: '#4B5563',
      secondaryBgDisabled: '#1F2937',
      secondaryBorder: '#1F2937',
      secondaryBorderDisabled: '#1F2937',
      deleteText: '#F87171',
      deleteTextDisabled: '#F87171',
      deleteBg: 'rgba(0, 0, 0, 0)',
      deleteBgDisabled: 'rgba(0, 0, 0, 0)',
      deleteFilledText: '#FFFFFF',
      deleteFilledTextDisabled: '#FFFFFF',
      deleteFilledBg: '#DC2626',
      deleteFilledBgDisabled: '#FECACA',
    },

    text: {
      primary: '#F9FAFB',
      secondary: '#FFFFFF',
    },

    checkbox: {
      true: '#1D4ED8',
      false: '#9CA3AF',
      bg: '#1F2937',
      br: '#9CA3AF',
      label: '#fff',
    },

    splitLine: {
      textMiddle: '#F3F4F6',
      text: '#9CA3AF',
      textBg: '#111827',
      border: '#6B7280',
    },

    typography: {
      primary: '#F9FAFB',
      secondary: '#FFFFFF',
      contrast: '#FFFFFF',
      accent: '#2563EB',
      gray: '#9CA3AF',
      additional: '#FFFFFF',
      nonactive: '#E5E7EB',
      delete: '#F87171',
      error: '#FCA5A5',
      blue: '#075985',
      focus: '#60A5FA',
    },

    photoPicker: {
      bg: '#1F2937',
      br: '#9CA3AF',
    },

    modal: {
      bg: '#1F2937',
      br: '#374151',
    },
    chatToolbar: {
      icons: '#D1D5DB',
      sendIcon: '#FFFFFF',
      borderTop: '#4B5563',
      input: '#374151',
      background: '#1F2937',
      text: '#FFFFFF',
    },
    icon: {
      create: '#E5E7EB',
      search: '#D1D5DB',
      filter: '#F3F4F6',
    },
    accordion: {
      defaultBg: '#111827',
      activeBg: '#111827',
      chapterBg: '#1F2937',
      border: '#1F2937',
    },
    systemMessage: {
      bg: '#E2E8F0',
    },
    splitline: {
      bg: '#1F2937',
    },
    cardCompany: {
      header: '#374151',
      footer: '#1D4ED8',
    },
    deal: {
      background: '#374151',
      backgroundDocument: '#1F2937',
      backgroundPinnedDocument: '#1F2937',
      backgroundPinned: '#374151',
    },
  },
};
