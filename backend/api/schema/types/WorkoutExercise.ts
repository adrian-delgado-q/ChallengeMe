import { builder, prisma } from '../../schema-builder';

builder.prismaObject('WorkoutExercise', {
	fields: (t: any) => ({
		id: t.exposeID('id'),
		workout_id: t.exposeString('workout_id'),
		activity_type_id: t.exposeString('activity_type_id'),
		order_index: t.exposeInt('order_index'),
		sets: t.exposeInt('sets', { nullable: true }),
		reps: t.exposeInt('reps', { nullable: true }),
		rest_time: t.exposeInt('rest_time', { nullable: true }),
		notes: t.exposeString('notes', { nullable: true }),
		// Relations
		workout: t.relation('workout'),
		activity_type: t.relation('activity_type'),
	}),
});

builder.queryField('workoutExercises', t =>
	t.prismaField({
		type: ['WorkoutExercise'],
		args: {
			workout_id: t.arg.string(),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.workoutExercise.findMany({
				...query,
				where: args.workout_id ? { workout_id: args.workout_id } : undefined,
				orderBy: { order_index: 'asc' },
			});
		},
	})
);

builder.mutationFields(t => ({
	// Custom mutation expected by frontend
	addExerciseToWorkout: t.prismaField({
		type: 'WorkoutExercise',
		args: {
			workout_id: t.arg.string({ required: true }),
			activity_type_id: t.arg.string({ required: true }),
			order_index: t.arg.int({ required: true }),
			sets: t.arg.int(),
			reps: t.arg.int(),
			rest_time: t.arg.int(),
			notes: t.arg.string(),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.workoutExercise.create({
				...query,
				data: {
					workout_id: args.workout_id,
					activity_type_id: args.activity_type_id,
					order_index: args.order_index,
					sets: args.sets || undefined,
					reps: args.reps || undefined,
					rest_time: args.rest_time || undefined,
					notes: args.notes || undefined,
				},
			});
		},
	}),

	// Custom mutation expected by frontend
	removeExerciseFromWorkout: t.prismaField({
		type: 'WorkoutExercise',
		args: {
			id: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.workoutExercise.delete({
				...query,
				where: { id: args.id },
			});
		},
	}),

	createWorkoutExercise: t.prismaField({
		type: 'WorkoutExercise',
		args: {
			workout_id: t.arg.string({ required: true }),
			activity_type_id: t.arg.string({ required: true }),
			order_index: t.arg.int({ required: true }),
			sets: t.arg.int(),
			reps: t.arg.int(),
			rest_time: t.arg.int(),
			notes: t.arg.string(),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.workoutExercise.create({
				...query,
				data: {
					workout_id: args.workout_id,
					activity_type_id: args.activity_type_id,
					order_index: args.order_index,
					sets: args.sets || undefined,
					reps: args.reps || undefined,
					rest_time: args.rest_time || undefined,
					notes: args.notes || undefined,
				},
			});
		},
	}),

	updateWorkoutExercise: t.prismaField({
		type: 'WorkoutExercise',
		args: {
			id: t.arg.string({ required: true }),
			order_index: t.arg.int(),
			sets: t.arg.int(),
			reps: t.arg.int(),
			rest_time: t.arg.int(),
			notes: t.arg.string(),
		},
		resolve: (query, root, args, ctx, info) => {
			const { id, ...data } = args;
			const updateData: any = {};
			if (data.order_index !== undefined) updateData.order_index = data.order_index;
			if (data.sets !== undefined) updateData.sets = data.sets;
			if (data.reps !== undefined) updateData.reps = data.reps;
			if (data.rest_time !== undefined) updateData.rest_time = data.rest_time;
			if (data.notes !== undefined) updateData.notes = data.notes;

			return prisma.workoutExercise.update({
				...query,
				where: { id },
				data: updateData,
			});
		},
	}),

	deleteWorkoutExercise: t.prismaField({
		type: 'WorkoutExercise',
		args: {
			id: t.arg.string({ required: true }),
		},
		resolve: (query, root, args, ctx, info) => {
			return prisma.workoutExercise.delete({
				...query,
				where: { id: args.id },
			});
		},
	}),
}));
