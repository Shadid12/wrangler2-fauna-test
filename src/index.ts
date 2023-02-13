import fauna from "faunadb";

const q = fauna.query;


export interface Env {
	FAUNA_SECRET: string;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const client = new fauna.Client({ secret: env.FAUNA_SECRET });
		const result = await client.query(
			q.Map(
				q.Paginate(q.Documents(q.Collection('Products'))),
				q.Lambda(x => q.Get(x))
			)
		);
		return new Response(JSON.stringify(result));
	},
};
