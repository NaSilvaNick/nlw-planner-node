import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { dayjs } from '../lib/dayjs'

export async function createTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/trips/:tripId/activities', {
    schema: {
      params: z.object({
        tripId: z.string().uuid()
      }),
      body: z.object({
        title: z.string().min(4),
        occurs_at: z.coerce.date()
      })
    }
  }, async (request) => {

    const { tripId } = request.params
    const { title, occurs_at } = request.body

    const trip = await prisma.trip.findUnique({
      where: { id: tripId }
    })

    if (!trip) throw new Error('Trip not found!')

    if ( dayjs(occurs_at).isBefore(trip.starts_at)
      || dayjs(occurs_at).isAfter(trip.ends_at) ) {
      throw new Error('Invalid activity date!')
    }

    const { id: activityId } = await prisma.activity.create({
      data: {
        title,
        occurs_at,
        trip_id: tripId,
      }
    })

    return { activityId }
  })
}