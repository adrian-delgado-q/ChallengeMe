import { builder } from '../../schema-builder';

builder.prismaObject('WorkoutProgramItem', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		program_id: t.exposeString('program_id'),
		workout_id: t.exposeString('workout_id'),
		order: t.exposeInt('order'),
		day_label: t.exposeString('day_label', { nullable: true }),
		// Relations
		program: t.relation('program'),
		workout: t.relation('workout'),
	}),
});
