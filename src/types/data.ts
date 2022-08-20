import type { GrantProgram, User, PersonalInformation, OrganizationInfo } from '@prisma/client';

export 	interface GrantPrograms extends GrantProgram {
  sponsorUser: User;
}

export interface UserDetails {
	user: User;
	userDetails: PersonalInformation;
	organization?: OrganizationInfo;
};
