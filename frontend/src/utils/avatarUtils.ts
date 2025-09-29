/**
 * Utility functions for avatar handling and display
 */

export interface AvatarData {
  src?: string | null;
  name?: string | null;
  fallbackText?: string;
}

export class AvatarUtils {
  /**
   * Generate a fallback avatar URL using a placeholder service
   */
  static generateFallbackUrl(
    name: string = 'User',
    size: number = 128,
    backgroundColor: string = '3b82f6',
    textColor: string = 'ffffff'
  ): string {
    const initial = name.charAt(0).toUpperCase();
    return `https://placehold.co/${size}x${size}/${backgroundColor}/${textColor}?text=${initial}`;
  }

  /**
   * Get the best available avatar source
   */
  static getAvatarSrc(
    user: {
      avatarUrl?: string | null;
      avatar?: string | null;
      name?: string | null;
      username?: string | null;
      email?: string | null;
    },
    size: number = 128
  ): string {
    // Priority order: avatarUrl, avatar, generated fallback
    if (user.avatarUrl) {
      return user.avatarUrl;
    }

    if (user.avatar) {
      return user.avatar;
    }

    // Generate fallback using name/username/email
    const displayName = user.name || user.username || user.email || 'User';
    return this.generateFallbackUrl(displayName, size);
  }

  /**
   * Get the display name for an avatar
   */
  static getDisplayName(
    user: {
      name?: string | null;
      username?: string | null;
      email?: string | null;
    },
    fallback: string = 'Anonymous'
  ): string {
    return user.name || user.username || user.email || fallback;
  }

  /**
   * Prepare avatar props for Chakra UI Avatar component
   */
  static getAvatarProps(
    user: {
      avatarUrl?: string | null;
      avatar?: string | null;
      name?: string | null;
      username?: string | null;
      email?: string | null;
    },
    size: string = 'md',
    showBorder: boolean = false
  ) {
    const src = this.getAvatarSrc(user);
    const name = this.getDisplayName(user);

    return {
      src,
      name,
      size,
      border: showBorder ? '2px solid' : undefined,
      borderColor: showBorder ? 'gray.200' : undefined,
    };
  }

  /**
   * Validate if an avatar URL is accessible
   */
  static async validateAvatarUrl(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Get initials from a name for avatar fallback
   */
  static getInitials(name: string, maxInitials: number = 2): string {
    if (!name) return 'U';

    const words = name
      .trim()
      .split(' ')
      .filter(word => word.length > 0);

    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    return words
      .slice(0, maxInitials)
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  }

  /**
   * Generate a deterministic color based on a string (for consistent avatar backgrounds)
   */
  static getConsistentColor(text: string): string {
    const colors = [
      '3b82f6', // blue
      'ef4444', // red
      '10b981', // green
      'f59e0b', // yellow
      '8b5cf6', // purple
      'ec4899', // pink
      '06b6d4', // cyan
      'f97316', // orange
    ];

    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }

  /**
   * Create avatar data object with all necessary properties
   */
  static createAvatarData(user: {
    avatarUrl?: string | null;
    avatar?: string | null;
    name?: string | null;
    username?: string | null;
    email?: string | null;
  }): AvatarData {
    const name = this.getDisplayName(user);
    const backgroundColor = this.getConsistentColor(name);

    return {
      src: user.avatarUrl || user.avatar || this.generateFallbackUrl(name, 128, backgroundColor),
      name,
      fallbackText: this.getInitials(name),
    };
  }
}
