package bazydanych.util

import org.jooq.ExecuteContext
import org.jooq.ExecuteListener
import org.jooq.tools.StopWatch


class StopwatchListener : ExecuteListener {
    private val threadLocalStopwatch: ThreadLocal<StopWatch> = ThreadLocal<StopWatch>()

    override fun renderEnd(context: ExecuteContext?) {
        threadLocalStopwatch.set(StopWatch())
    }

    override fun fetchEnd(context: ExecuteContext?) {
        val stopwatch: StopWatch = threadLocalStopwatch.get()
        stopwatch.splitDebug("Query [${context?.sql()}]")
    }
}