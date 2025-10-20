import { builder } from '../../schema-builder';

builder.prismaObject('UserFollow', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		follower_id: t.exposeString('follower_id'),
		following_id: t.exposeString('following_id'),
		// Relations
		follower: t.relation('follower'),
		following: t.relation('following'),
	}),
});
