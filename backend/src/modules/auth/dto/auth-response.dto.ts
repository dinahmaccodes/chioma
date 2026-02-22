import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'John', nullable: true })
  firstName: string | null;

  @ApiProperty({ example: 'Doe', nullable: true })
  lastName: string | null;

  @ApiProperty({ example: 'tenant', description: 'User role' })
  role: string;
}

/**
 * Response DTO returned when MFA verification is required.
 * The mfaRequired discriminant is always `true`.
 */
export class MfaRequiredResponseDto {
  @ApiProperty({
    example: true,
    description: 'Indicates MFA verification is required to complete login',
  })
  readonly mfaRequired: true = true;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Short-lived temporary token for completing MFA verification',
  })
  mfaToken: string;

  @ApiProperty({ type: UserProfileDto })
  user: UserProfileDto;

  @ApiProperty({ nullable: true, example: null })
  accessToken: null;

  @ApiProperty({ nullable: true, example: null })
  refreshToken: null;
}

/**
 * Response DTO returned on a successful, fully-authenticated login.
 * The mfaRequired discriminant is always `false`.
 */
export class AuthSuccessResponseDto {
  @ApiProperty({
    example: false,
    description: 'Indicates authentication succeeded without additional MFA step',
  })
  readonly mfaRequired: false = false;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: false,
    nullable: true,
  })
  refreshToken: string | null;

  @ApiProperty({ type: UserProfileDto })
  user: UserProfileDto;
}

/**
 * Discriminated union of possible login responses.
 * Consumers should check `mfaRequired` to distinguish between the two cases.
 */
export type LoginResponseDto = MfaRequiredResponseDto | AuthSuccessResponseDto;

/**
 * Kept for backward compatibility with register / completeMfaLogin / stellar-auth endpoints.
 */
export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string | null;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', required: false })
  refreshToken: string | null;

  @ApiProperty({ type: UserProfileDto })
  user: UserProfileDto;

  @ApiProperty({ example: false, required: false })
  mfaRequired?: boolean;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', required: false })
  mfaToken?: string;
}

export class MessageResponseDto {
  @ApiProperty({ example: 'Operation successful' })
  message: string;
}

