import { builder, prisma } from '../../schema-builder';

builder.prismaObject('WorkoutProgram', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		creator_id: t.exposeString('creator_id'),
		name: t.exposeString('name'),
		description: t.exposeString('description', { nullable: true }),
		image_url: t.exposeString('image_url', { nullable: true }),
		visibility: t.expose('visibility', { type: 'ContentVisibility' }),
		created_at: t.expose('created_at', { type: 'Date' }),
		// Relations
		creator: t.relation('creator'),
		workouts: t.relation('workouts'),
	}),
});

builder.mutationFields(t => ({
	addWorkoutToProgram: t.prismaField({
		type: 'WorkoutProgramItem',
		args: {
			programId: t.arg.string({ required: true }),
			workoutId: t.arg.string({ required: true }),
			order: t.arg.int({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.workoutProgramItem.create({
				data: {
					program_id: args.programId,
					workout_id: args.workoutId,
					order: args.order,
				},
			});
		},
	}),
}));
